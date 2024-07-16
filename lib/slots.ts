// @ts-expect-error
export const getSlotChildrenText = (children) =>
  children
    .map((node: any) => {
      if (!node.children || typeof node.children === 'string')
        return node.children || '';
      if (Array.isArray(node.children))
        return getSlotChildrenText(node.children);
      if (node.children.default)
        return getSlotChildrenText(node.children.default());
    })
    .join('');
