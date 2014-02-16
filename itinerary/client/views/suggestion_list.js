var suggestionsData = [

	{
		imgUrl: '/img/jones-the-grocer.jpg',
		title: 'Jones the Grocer',
		description: 'With products sourced and selected from around the globe, jones the grocer is a food emporium focused on providing natural ingredients produced by specialist, artisan suppliers and showcases these through the innovative in store cafe menu which you can enjoy in the casual atmosphere of our contemporary designed cafes..',
		location: 'Al Mamoura, Al Mamoura Building B, Ground Floor 06/07, Corner 4th Muroor and 15th Street, Abu Dhabi, UAE',
		phone: '+971 2 4438 762',
		exploreUrl:'http://www.jonesthegrocer.com/index.php?pageID=14260&merchant_id=0',
	}, 
	{
		imgUrl: '/img/maroush.jpg',
		title: 'Maroush',
		description: 'Restaurant with traditional Arabic Dishes with affordable prices and a genuine arabic atmosphere.',
		location: 'Po Box .26269- Salam Street, City Abu Dhabi',
		phone: '+971-2-6441419',
		exploreUrl:'http://www.yadig.com/business/abu-dhabi/maroush-restaurant/2418/',
	},
	{
		imgUrl: '/img/cleaning-up-the-mangroves.jpg',
		title: 'Clean up the Mangroves',
		description: 'Go kayaking in the morning and clean up the Mangroves in the afternoon.',
		location: 'The Mangroves',
		phone: '',
		exploreUrl:'http://www.greenabudhabi.org/2013/mangrove-cleanup.html',
	},
	
	{
		imgUrl: '/img/heritage-village.jpg',
		title: 'Heritage Village',
		description: 'Run by the Emirates Heritage Club, this reconstruction of a traditional oasis village provides an interesting glimpse into the emirates past.Traditional aspects of the desert way of life, including a campfire with coffee pots, a goats’ hair tent, and a falaj irrigation system, are attractively displayed in the open museum.',
		location: 'Marina Mall, Breakwater, Abu Dhabi, UAE',
		phone: '+971 2 681 4455',
		exploreUrl:'http://www.tripadvisor.fr/Attraction_Review-g294013-d671133-Reviews-Heritage_Village-Abu_Dhabi_Emirate_of_Abu_Dhabi.html',
	}
	
];

Template.suggestionsList.helpers({
	suggestions : suggestionsData
});
