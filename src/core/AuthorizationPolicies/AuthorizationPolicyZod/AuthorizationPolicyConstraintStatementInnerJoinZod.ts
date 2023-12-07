import { z } from 'zod';
import { IAuthorizationPolicyConstraintStatementJoinMode } from '../../../domain';
import { AuthorizationPolicyConditionZod } from './AuthorizationPolicyConditionZod';

export const AuthorizationPolicyConstraintStatementInnerJoinZod = z.object({
  mode: z.nativeEnum(IAuthorizationPolicyConstraintStatementJoinMode),
  b_resource: z.string(),
  b_alias: z.string(),
  on_condition: AuthorizationPolicyConditionZod,
});
