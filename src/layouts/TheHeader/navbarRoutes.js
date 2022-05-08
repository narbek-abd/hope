export default [
	{
		id: 1,
		name: "Home",
		link: "/",
		children: [
			{
				id: 2,
				name: "Products",
				link: "/catalog",
			},

			{
				id: 3,
				name: "User",
				children: [
					{
						id: 4,
						name: "Wishlist",
						link: "#",
					},
					{
						id: 5,
						name: "Cart",
						link: "#",
					},
				],
			},
		],
	},

	{
		id: 6,
		name: "Products",
		link: "/catalog",
	},

	{
		id: 7,
		name: "Admin",
		link: "/admin",
	},
];
