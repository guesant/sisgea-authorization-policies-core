import { AuthorizationPolicyUtils, Builder } from '..';
import {
  IAliasesMapping,
  IAnyIterable,
  IAuthorizationPolicyConstraintAttachedStatement,
  IAuthorizationPolicyMixedStatement,
} from '../../../domain';
import { changeConditionAliasesUsages } from '../AuthorizationPolicyCondition/AuthorizationPolicyConditionUtils/changeConditionAliasesUsages';
import { attachBehaviourOnCondition } from './AuthorizationPolicyConstraintAttachedStatementsMixerUtils';

export class AuthorizationPolicyConstraintAttachedStatementMixer {
  #alias_counter = 0;

  #alias: string = 'row';
  #where: IAuthorizationPolicyMixedStatement['where'] | null = null;
  #inner_joins: IAuthorizationPolicyMixedStatement['inner_joins'] = [];

  constructor(private getNewAlias = AuthorizationPolicyUtils.getNewAlias) {}

  private adaptAttachedStatement(attachedStatement: IAuthorizationPolicyConstraintAttachedStatement) {
    const adaptedAttachedStatement = structuredClone(attachedStatement);

    //

    const aliasesMapping: IAliasesMapping = new Map<string, string>();

    //

    aliasesMapping.set(adaptedAttachedStatement.alias, this.#alias);

    for (const inner_join of adaptedAttachedStatement.inner_joins) {
      const old_alias = inner_join.b_alias;
      const new_alias = `b_${++this.#alias_counter}_${old_alias}`;
      aliasesMapping.set(old_alias, new_alias);
    }

    //

    adaptedAttachedStatement.alias = this.getNewAlias(adaptedAttachedStatement.alias, aliasesMapping);

    changeConditionAliasesUsages(adaptedAttachedStatement.where, aliasesMapping);

    for (const inner_join of adaptedAttachedStatement.inner_joins) {
      inner_join.b_alias = this.getNewAlias(inner_join.b_alias, aliasesMapping);
      changeConditionAliasesUsages(inner_join.on_condition, aliasesMapping);
    }

    return adaptedAttachedStatement;
  }

  addAttachedStatement(attachedStatement: IAuthorizationPolicyConstraintAttachedStatement) {
    const adaptedAttachedStatement = this.adaptAttachedStatement(attachedStatement);

    this.#where = attachBehaviourOnCondition(this.#where ?? null, adaptedAttachedStatement.where, adaptedAttachedStatement.behaviour);

    this.#inner_joins.push(...adaptedAttachedStatement.inner_joins);

    return this;
  }

  async addAttachedStatements(attachedStatements: IAnyIterable<IAuthorizationPolicyConstraintAttachedStatement>) {
    for await (const attachedStatement of attachedStatements) {
      this.addAttachedStatement(attachedStatement);
    }

    return this;
  }

  get state(): IAuthorizationPolicyMixedStatement {
    return structuredClone({
      alias: this.#alias,
      where: this.#where ?? Builder.False(),
      inner_joins: this.#inner_joins,
    });
  }
}
