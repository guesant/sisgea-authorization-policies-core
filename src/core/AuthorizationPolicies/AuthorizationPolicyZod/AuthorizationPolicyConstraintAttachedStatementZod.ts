import { z } from 'zod';
import {
  IAuthorizationPolicyConstraintAttachedStatementBehaviour,
  IAuthorizationPolicyConstraintStatementBuilderSpecialAction,
  IAuthorizationPolicyConstraintStatementBuilderSpecialTarget,
} from '../../../domain';
import { AuthorizationPolicyConditionZod } from './AuthorizationPolicyConditionZod';
import { AuthorizationPolicyConstraintStatementInnerJoinZod } from './AuthorizationPolicyConstraintStatementInnerJoinZod';

export const AuthorizationPolicyConstraintAttachedStatementZod = z.object({
  behaviour: z.nativeEnum(IAuthorizationPolicyConstraintAttachedStatementBehaviour),

  alias: z.string().nullable(),

  action: z.union([
    //
    z.array(z.string()),
    z.literal(IAuthorizationPolicyConstraintStatementBuilderSpecialAction.MANAGE),
  ]),

  target: z.union([
    //
    z.array(z.string()),
    z.literal(IAuthorizationPolicyConstraintStatementBuilderSpecialTarget.ALL),
  ]),

  where: AuthorizationPolicyConditionZod,

  joins: z.array(AuthorizationPolicyConstraintStatementInnerJoinZod),
});
