import { castArray } from 'lodash';
import {
  IAuthorizationPolicyAttachedConstraint,
  IAuthorizationPolicyConstraintAttachedStatement,
  IAuthorizationPolicyConstraintAttachedStatementBehaviour,
  IAuthorizationPolicyConstraintConstructContext,
  IAuthorizationPolicyConstraintStatementBuilder,
  IAuthorizationPolicyConstraintStatementBuilderSpecialAction,
  IAuthorizationPolicyConstraintStatementBuilderSpecialTarget,
  IAuthorizationPolicyConstraintStatementJoinMode,
} from '../../../domain';
import { Builder } from '../AuthorizationPolicyCondition';
import { AuthorizationPolicyConstraintAttachedStatementZod } from '../AuthorizationPolicyZod';

export class AuthorizationPolicyAttachedConstraintHandler {
  static async *construct<TargetActor = unknown>(attachedConstraint: IAuthorizationPolicyAttachedConstraint, targetActor: TargetActor) {
    const attachedStatements = new Set<IAuthorizationPolicyConstraintAttachedStatement>();

    const ctx: IAuthorizationPolicyConstraintConstructContext<TargetActor> = {
      targetActor,

      statement() {
        const state: Partial<IAuthorizationPolicyConstraintAttachedStatement> = {
          alias: 'row',
          behaviour: undefined,
          action: undefined,
          target: undefined,
          where: undefined,
          joins: [],
        };

        const validate = (): false | IAuthorizationPolicyConstraintAttachedStatement => {
          const result = AuthorizationPolicyConstraintAttachedStatementZod.safeParse(state);

          if (result.success) {
            const data = result.data;

            return <IAuthorizationPolicyConstraintAttachedStatement>data;
          }

          return false;
        };

        const attach = () => {
          const data = validate();

          if (data !== false) {
            attachedStatements.add(data);
            return true;
          }

          throw new Error('Incomplete statement.');
        };

        const builder = <IAuthorizationPolicyConstraintStatementBuilder>{
          //

          alias(alias: string) {
            state.alias = alias;
            return builder;
          },

          action(action: IAuthorizationPolicyConstraintStatementBuilderSpecialAction.MANAGE | string[] | string) {
            if (action === IAuthorizationPolicyConstraintStatementBuilderSpecialAction.MANAGE) {
              state.action = action;
            } else {
              state.action = castArray(action);
            }

            return builder;
          },

          target(target: IAuthorizationPolicyConstraintStatementBuilderSpecialTarget.ALL | string[] | string) {
            if (target === IAuthorizationPolicyConstraintStatementBuilderSpecialTarget.ALL) {
              state.target = target;
            } else {
              state.target = castArray(target);
            }

            return builder;
          },

          where(condition: any) {
            if (typeof condition === 'boolean') {
              state.where = condition ? Builder.True() : Builder.False();
            } else {
              state.where = condition;
            }

            return builder;
          },

          inner_join(b_resource, b_alias, on_condition) {
            state.joins ??= [];

            state.joins.push({
              mode: IAuthorizationPolicyConstraintStatementJoinMode.INNER,
              b_resource: b_resource,
              b_alias: b_alias,
              on_condition: on_condition,
            });

            return builder;
          },

          reject() {
            state.behaviour = IAuthorizationPolicyConstraintAttachedStatementBehaviour.REJECT;
            attach();
          },

          approve() {
            state.behaviour = IAuthorizationPolicyConstraintAttachedStatementBehaviour.APPROVE;
            attach();
          },

          void() {
            state.behaviour = IAuthorizationPolicyConstraintAttachedStatementBehaviour.VOID;
            attach();
          },
        };

        return builder;
      },
    };

    await attachedConstraint.constraint.construct(ctx);

    yield* attachedStatements;
  }
}
