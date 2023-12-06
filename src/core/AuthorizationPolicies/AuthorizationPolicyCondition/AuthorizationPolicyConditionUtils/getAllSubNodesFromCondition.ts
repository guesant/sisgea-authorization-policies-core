import { IAuthorizationPolicyCondition, IAuthorizationPolicyConditionKind, IAuthorizationPolicyConditionUtils } from '../../../../domain';

export const getAllSubNodesFromCondition: IAuthorizationPolicyConditionUtils.GetAllSubNodesFromCondition = function* (rootNode) {
  const nodesAlreadyHandled = new Set<IAuthorizationPolicyCondition>();

  const nodesToBeHandled = new Set<IAuthorizationPolicyCondition>();

  nodesToBeHandled.add(rootNode);

  const getNodesToBeHandled = function* () {
    while (nodesToBeHandled.size > 0) {
      const it = nodesToBeHandled.values();
      const node = <IAuthorizationPolicyCondition>it.next().value;

      if (!nodesAlreadyHandled.has(node)) {
        yield node;

        nodesAlreadyHandled.add(node);
      } else {
        throw new Error('Circular condition node is not allowed.');
      }

      nodesToBeHandled.delete(node);
    }
  };

  for (const node of getNodesToBeHandled()) {
    switch (node.kind) {
      case IAuthorizationPolicyConditionKind.VALUE_OPERATOR_UNARY: {
        nodesToBeHandled.add(node.value);
        break;
      }

      case IAuthorizationPolicyConditionKind.VALUE_OPERATOR_COMPARE_BINARY: {
        nodesToBeHandled.add(node.left);
        nodesToBeHandled.add(node.right);
        break;
      }
    }
  }

  yield* nodesAlreadyHandled;
};
