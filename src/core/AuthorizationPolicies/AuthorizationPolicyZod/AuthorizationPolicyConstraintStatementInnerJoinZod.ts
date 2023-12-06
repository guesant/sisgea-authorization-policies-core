import { z } from 'zod';
import { AuthorizationPolicyConditionZod } from './AuthorizationPolicyConditionZod';

export const AuthorizationPolicyConstraintStatementInnerJoinZod = z.object({
  b_resource: z.string(),
  b_alias: z.string(),
  on_condition: AuthorizationPolicyConditionZod,
});
