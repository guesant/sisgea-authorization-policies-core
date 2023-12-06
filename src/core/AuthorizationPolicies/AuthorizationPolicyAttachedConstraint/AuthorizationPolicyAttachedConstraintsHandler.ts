import { IAnyIterable, IAuthorizationPolicyAttachedConstraint } from '../../../domain';
import { AuthorizationPolicyAttachedConstraintHandler } from './AuthorizationPolicyAttachedConstraintHandler';

export class AuthorizationPolicyAttachedConstraintsHandler {
  static async *buildAttachedStatements<TargetActor = unknown>(
    attachedConstraintsIterable: IAnyIterable<IAuthorizationPolicyAttachedConstraint<TargetActor>>,
    targetActor: TargetActor,
  ) {
    for await (const attachedConstraint of attachedConstraintsIterable) {
      yield* AuthorizationPolicyAttachedConstraintHandler.construct<TargetActor>(attachedConstraint, targetActor);
    }
  }
}
