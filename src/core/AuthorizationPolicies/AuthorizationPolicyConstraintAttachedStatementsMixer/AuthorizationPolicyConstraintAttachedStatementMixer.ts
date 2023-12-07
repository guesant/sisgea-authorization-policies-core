import {
  IAliasesMapping,
  IAnyIterable,
  IAuthorizationPolicyConstraintAttachedStatement,
  IAuthorizationPolicyConstraintAttachedStatementBehaviour,
  IAuthorizationPolicyMixedStatement,
  IAuthorizationPolicyMixedStatementSubStatementMixed,
} from '../../../domain';
import { getNewAlias } from '../AuthorizationPolicy/AuthorizationPolicyUtils';
import { changeConditionAliasesUsages } from '../AuthorizationPolicyCondition/AuthorizationPolicyConditionUtils/changeConditionAliasesUsages';
import { attachBehaviourOnCondition } from './AuthorizationPolicyConstraintAttachedStatementsMixerUtils';

export class AuthorizationPolicyConstraintAttachedStatementMixer {
  #alias_counter = 0;

  #mixedStatement: IAuthorizationPolicyMixedStatement = {
    alias: 'row',
    subStatementMixed: [],
  };

  get state(): IAuthorizationPolicyMixedStatement {
    return structuredClone(this.#mixedStatement);
  }

  private adaptAttachedStatement(attachedStatement: IAuthorizationPolicyConstraintAttachedStatement) {
    const adaptedAttachedStatement = structuredClone(attachedStatement);

    //

    const aliasesMapping: IAliasesMapping = new Map<string, string>();

    //

    aliasesMapping.set(adaptedAttachedStatement.alias, this.#mixedStatement.alias);

    for (const join of adaptedAttachedStatement.joins) {
      const old_alias = join.b_alias;

      const new_alias = `b_${++this.#alias_counter}_${old_alias}`;

      aliasesMapping.set(old_alias, new_alias);
    }

    //

    adaptedAttachedStatement.alias = getNewAlias(adaptedAttachedStatement.alias, aliasesMapping);

    changeConditionAliasesUsages(adaptedAttachedStatement.where, aliasesMapping);

    for (const join of adaptedAttachedStatement.joins) {
      join.b_alias = getNewAlias(join.b_alias, aliasesMapping);
      changeConditionAliasesUsages(join.on_condition, aliasesMapping);
    }

    return adaptedAttachedStatement;
  }

  addAttachedStatement(attachedStatement: IAuthorizationPolicyConstraintAttachedStatement) {
    const adaptedAttachedStatement = this.adaptAttachedStatement(attachedStatement);

    if (adaptedAttachedStatement.joins.length > 0 || this.#mixedStatement.subStatementMixed.length > 1) {
      this.#mixedStatement.subStatementMixed.push({
        behaviour: adaptedAttachedStatement.behaviour,
        where: adaptedAttachedStatement.where,
        joins: adaptedAttachedStatement.joins,
      });
    } else {
      const mainStatement: IAuthorizationPolicyMixedStatementSubStatementMixed | null = this.#mixedStatement.subStatementMixed[0] ?? null;

      const adaptedWhere = attachBehaviourOnCondition(
        mainStatement?.where ?? null,
        adaptedAttachedStatement.where,
        adaptedAttachedStatement.behaviour,
      );

      if (adaptedWhere) {
        this.#mixedStatement.subStatementMixed[0] = {
          behaviour: IAuthorizationPolicyConstraintAttachedStatementBehaviour.APPROVE,
          where: adaptedWhere,
          joins: [],
        };
      }
    }

    return this;
  }

  async addAttachedStatements(attachedStatements: IAnyIterable<IAuthorizationPolicyConstraintAttachedStatement>) {
    for await (const attachedStatement of attachedStatements) {
      this.addAttachedStatement(attachedStatement);
    }

    return this;
  }
}
