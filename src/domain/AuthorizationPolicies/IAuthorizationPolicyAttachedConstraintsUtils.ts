import { IAnyIterable } from '../IAnyIterable';
import { IAuthorizationPolicyAttachedConstraint } from './IAuthorizationPolicyAttachedConstraint';

export type IFilterAttachedConstraintsForTargetActorDependencies<ITargetActor = unknown> = {
  checkRoles(targetActor: ITargetActor, roles: string[]): Promise<boolean>;
};

export type IFilterAttachedConstraintsForTargetActor<ITargetActor = unknown> = (
  attachedConstraintsIterable: IAnyIterable<IAuthorizationPolicyAttachedConstraint>,

  targetActor: ITargetActor,

  deps: IFilterAttachedConstraintsForTargetActorDependencies<ITargetActor>,
) => AsyncIterable<IAuthorizationPolicyAttachedConstraint>;
