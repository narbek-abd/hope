let ids = [];

export default function getChildrenIds(list) {
	ids = [];

	if(!list) return [];

	$_recursiveGetIds(list);

	return ids;
}

function $_recursiveGetIds(list) {
	list.forEach((item) => {
		ids.push(item.id);

		if (item.children && item.children.length > 0) {
			$_recursiveGetIds(item.children);
		}
	});
}
