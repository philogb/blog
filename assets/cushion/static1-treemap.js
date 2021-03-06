function init() {
	//computes page layout (not a library function, used to adjust some css thingys on the page)
	Infovis.initLayout();
	var cushion = true;			
	var json = {"children": [{"children": [{"children": [], "data": [{"value": "80", "key": "play count"}, {"value": "30", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B0007DAZW8.01.MZZZZZZZ.jpg", "key": "image"}], "id": "056e4f3e-d505-4dad-8ec1-d04f521cbb56Human After All", "name": "Human After All"}], "data": [{"value": 80, "key": "play count"}], "id": "056e4f3e-d505-4dad-8ec1-d04f521cbb56a", "name": "Daft Punk"}, {"children": [{"children": [], "data": [{"value": "94", "key": "play count"}, {"value": "23", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2393956.jpg", "key": "image"}], "id": "f2fa5cf6-e0b0-4559-8641-e033f1a9e6fcClearing the Channel", "name": "Clearing the Channel"}], "data": [{"value": 94, "key": "play count"}], "id": "f2fa5cf6-e0b0-4559-8641-e033f1a9e6fca", "name": "Sinch"}, {"children": [{"children": [], "data": [{"value": "211", "key": "play count"}, {"value": "2", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2564320-1193176651.jpg", "key": "image"}], "id": "4bd95eea-b9f6-4d70-a36c-cfea77431553Music Bank", "name": "Music Bank"}], "data": [{"value": 211, "key": "play count"}], "id": "4bd95eea-b9f6-4d70-a36c-cfea77431553a", "name": "Alice in Chains"}, {"children": [{"children": [], "data": [{"value": "153", "key": "play count"}, {"value": "6", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1721.jpg", "key": "image"}], "id": "8bfac288-ccc5-448d-9573-c33ea2aa5c30One Hot Minute", "name": "One Hot Minute"}, {"children": [], "data": [{"value": "69", "key": "play count"}, {"value": "35", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/4791.jpg", "key": "image"}], "id": "8bfac288-ccc5-448d-9573-c33ea2aa5c30Californication", "name": "Californication"}, {"children": [], "data": [{"value": "69", "key": "play count"}, {"value": "35", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2024268.jpg", "key": "image"}], "id": "8bfac288-ccc5-448d-9573-c33ea2aa5c30Greatest Hits", "name": "Greatest Hits"}], "data": [{"value": 291, "key": "play count"}], "id": "8bfac288-ccc5-448d-9573-c33ea2aa5c30a", "name": "Red Hot Chili Peppers"}, {"children": [{"children": [], "data": [{"value": "114", "key": "play count"}, {"value": "15", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B0000UX5IY.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "ff6e677f-91dd-4986-a174-8db0474b1799Thicker Than Water", "name": "Thicker Than Water"}, {"children": [], "data": [{"value": "83", "key": "play count"}, {"value": "28", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/20555-93189758.jpg", "key": "image"}], "id": "ff6e677f-91dd-4986-a174-8db0474b1799On and On", "name": "On and On"}, {"children": [], "data": [{"value": "62", "key": "play count"}, {"value": "41", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1434260-738979592.jpg", "key": "image"}], "id": "ff6e677f-91dd-4986-a174-8db0474b1799Brushfire Fairytales", "name": "Brushfire Fairytales"}], "data": [{"value": 259, "key": "play count"}], "id": "ff6e677f-91dd-4986-a174-8db0474b1799a", "name": "Jack Johnson"}, {"children": [{"children": [], "data": [{"value": "65", "key": "play count"}, {"value": "38", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/24926-741377443.jpg", "key": "image"}], "id": "83b9cbe7-9857-49e2-ab8e-b57b01038103Vs.", "name": "Vs."}, {"children": [], "data": [{"value": "61", "key": "play count"}, {"value": "44", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2028322-185275774.jpg", "key": "image"}], "id": "83b9cbe7-9857-49e2-ab8e-b57b01038103Riot Act", "name": "Riot Act"}, {"children": [], "data": [{"value": "61", "key": "play count"}, {"value": "44", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/4911-553393077.jpg", "key": "image"}], "id": "83b9cbe7-9857-49e2-ab8e-b57b01038103Yield", "name": "Yield"}], "data": [{"value": 187, "key": "play count"}], "id": "83b9cbe7-9857-49e2-ab8e-b57b01038103a", "name": "Pearl Jam"}, {"children": [{"children": [], "data": [{"value": "115", "key": "play count"}, {"value": "14", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2039854-1850216884.jpg", "key": "image"}], "id": "bfd085b8-0bbf-46b3-8ab9-193bca5c85e7Above", "name": "Above"}], "data": [{"value": 115, "key": "play count"}], "id": "bfd085b8-0bbf-46b3-8ab9-193bca5c85e7a", "name": "Mad Season"}, {"children": [{"children": [], "data": [{"value": "108", "key": "play count"}, {"value": "17", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B000002J8M.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "8c32bb01-58a3-453b-8050-8c0620edb0e5Tiny Music... Songs From the Vatican Gift Shop", "name": "Tiny Music... Songs From the Vatican Gift Shop"}, {"children": [], "data": [{"value": "60", "key": "play count"}, {"value": "46", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B000002IU3.01.MZZZZZZZ.jpg", "key": "image"}], "id": "8c32bb01-58a3-453b-8050-8c0620edb0e5Core", "name": "Core"}], "data": [{"value": 168, "key": "play count"}], "id": "8c32bb01-58a3-453b-8050-8c0620edb0e5a", "name": "Stone Temple Pilots"}, {"children": [{"children": [], "data": [{"value": "63", "key": "play count"}, {"value": "40", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B00005NWLC.01.MZZZZZZZ.jpg", "key": "image"}], "id": "7b2f87f6-db90-464e-a27a-deb4f7219e90Leitmotif", "name": "Leitmotif"}], "data": [{"value": 63, "key": "play count"}], "id": "7b2f87f6-db90-464e-a27a-deb4f7219e90a", "name": "dredg"}, {"children": [{"children": [], "data": [{"value": "188", "key": "play count"}, {"value": "3", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B000EULJLU.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "66fc5bf8-daa4-4241-b378-9bc9077939d210,000 Days", "name": "10,000 Days"}], "data": [{"value": 188, "key": "play count"}], "id": "66fc5bf8-daa4-4241-b378-9bc9077939d2a", "name": "Tool"}, {"children": [{"children": [], "data": [{"value": "62", "key": "play count"}, {"value": "41", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B00001P4TH.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "b7ffd2af-418f-4be2-bdd1-22f8b48613daThe Fragile (Left)", "name": "The Fragile (Left)"}], "data": [{"value": 62, "key": "play count"}], "id": "b7ffd2af-418f-4be2-bdd1-22f8b48613daa", "name": "Nine Inch Nails"}, {"children": [{"children": [], "data": [{"value": "240", "key": "play count"}, {"value": "1", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2027953-348729467.jpg", "key": "image"}], "id": "a5585acd-9b65-49a7-a63b-3cc4ee18846eMother Love Bone", "name": "Mother Love Bone"}], "data": [{"value": 240, "key": "play count"}], "id": "a5585acd-9b65-49a7-a63b-3cc4ee18846ea", "name": "Mother Love Bone"}, {"children": [{"children": [], "data": [{"value": "67", "key": "play count"}, {"value": "37", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1418871.jpg", "key": "image"}], "id": "7527f6c2-d762-4b88-b5e2-9244f1e34c46Around the Fur", "name": "Around the Fur"}], "data": [{"value": 67, "key": "play count"}], "id": "7527f6c2-d762-4b88-b5e2-9244f1e34c46a", "name": "Deftones"}, {"children": [{"children": [], "data": [{"value": "62", "key": "play count"}, {"value": "41", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B0000A5BYD.03.MZZZZZZZ.jpg", "key": "image"}], "id": "7bdb6921-8380-422c-8514-87cf30d5d8ccIt All Makes Sense Now", "name": "It All Makes Sense Now"}], "data": [{"value": 62, "key": "play count"}], "id": "7bdb6921-8380-422c-8514-87cf30d5d8cca", "name": "Kr\u00f3m"}, {"children": [{"children": [], "data": [{"value": "57", "key": "play count"}, {"value": "48", "key": "rank"}, {"value": "http:\/\/images-eu.amazon.com\/images\/P\/B00005IABM.02.MZZZZZZZ.jpg", "key": "image"}], "id": "cb67438a-7f50-4f2b-a6f1-2bb2729fd53810,000 Hz Legend", "name": "10,000 Hz Legend"}], "data": [{"value": 57, "key": "play count"}], "id": "cb67438a-7f50-4f2b-a6f1-2bb2729fd538a", "name": "Air"}, {"children": [{"children": [], "data": [{"value": "168", "key": "play count"}, {"value": "5", "key": "rank"}, {"value": "http:\/\/userserve-ak.last.fm\/serve\/130x130\/4797435.jpg", "key": "image"}], "id": "c5998351-be49-49d8-8593-3e96f129c1fcMamagubida", "name": "Mamagubida"}, {"children": [], "data": [{"value": "141", "key": "play count"}, {"value": "7", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/depth\/catalogue\/noimage\/cover_med.gif", "key": "image"}], "id": "c5998351-be49-49d8-8593-3e96f129c1fcReggae \u00e0 Coup de Cirque", "name": "Reggae \u00e0 Coup de Cirque"}, {"children": [], "data": [{"value": "135", "key": "play count"}, {"value": "8", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1419776-1246197824.jpg", "key": "image"}], "id": "c5998351-be49-49d8-8593-3e96f129c1fcGrain de sable", "name": "Grain de sable"}, {"children": [], "data": [{"value": "80", "key": "play count"}, {"value": "30", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1419747.jpg", "key": "image"}], "id": "c5998351-be49-49d8-8593-3e96f129c1fcFaut qu'ils s'activent...", "name": "Faut qu'ils s'activent..."}], "data": [{"value": 524, "key": "play count"}], "id": "c5998351-be49-49d8-8593-3e96f129c1fca", "name": "Tryo"}, {"children": [{"children": [], "data": [{"value": "57", "key": "play count"}, {"value": "48", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1418895.jpg", "key": "image"}], "id": "4bb4e4e4-5f66-4509-98af-62dbb90c45c5The Sickness", "name": "The Sickness"}], "data": [{"value": 57, "key": "play count"}], "id": "4bb4e4e4-5f66-4509-98af-62dbb90c45c5a", "name": "Disturbed"}, {"children": [{"children": [], "data": [{"value": "72", "key": "play count"}, {"value": "34", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2025293-1110011556.jpg", "key": "image"}], "id": "95f5b748-d370-47fe-85bd-0af2dc450bc0Second-Hand Smoke", "name": "Second-Hand Smoke"}], "data": [{"value": 72, "key": "play count"}], "id": "95f5b748-d370-47fe-85bd-0af2dc450bc0a", "name": "Sublime"}, {"children": [{"children": [], "data": [{"value": "73", "key": "play count"}, {"value": "33", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1417706-365935743.jpg", "key": "image"}], "id": "020bfbb4-05c3-4c86-b372-17825c262094Audioslave", "name": "Audioslave"}], "data": [{"value": 73, "key": "play count"}], "id": "020bfbb4-05c3-4c86-b372-17825c262094a", "name": "Audioslave"}, {"children": [{"children": [], "data": [{"value": "124", "key": "play count"}, {"value": "10", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/37911-493308434.jpg", "key": "image"}], "id": "e9571c17-817f-4d34-ae3f-0c7a96f822c1Temple of the Dog", "name": "Temple of the Dog"}], "data": [{"value": 124, "key": "play count"}], "id": "e9571c17-817f-4d34-ae3f-0c7a96f822c1a", "name": "Temple of the Dog"}, {"children": [{"children": [], "data": [{"value": "82", "key": "play count"}, {"value": "29", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B0002ZEUKO.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "06fb1c8b-566e-4cb2-985b-b467c90781d4Are You Experienced?", "name": "Are You Experienced?"}, {"children": [], "data": [{"value": "64", "key": "play count"}, {"value": "39", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2201895-1337454629.jpg", "key": "image"}], "id": "06fb1c8b-566e-4cb2-985b-b467c90781d4First Rays of the New Rising Sun", "name": "First Rays of the New Rising Sun"}], "data": [{"value": 146, "key": "play count"}], "id": "06fb1c8b-566e-4cb2-985b-b467c90781d4a", "name": "Jimi Hendrix"}, {"children": [{"children": [], "data": [{"value": "56", "key": "play count"}, {"value": "50", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B0000DZDYN.01.MZZZZZZZ.jpg", "key": "image"}], "id": "fbd2a255-1d57-4d31-ac11-65b671c19958The Singles 1992-2003", "name": "The Singles 1992-2003"}], "data": [{"value": 56, "key": "play count"}], "id": "fbd2a255-1d57-4d31-ac11-65b671c19958a", "name": "No Doubt"}, {"children": [{"children": [], "data": [{"value": "123", "key": "play count"}, {"value": "11", "key": "rank"}, {"value": "http:\/\/userserve-ak.last.fm\/serve\/130x130\/5614343.jpg", "key": "image"}], "id": "078a9376-3c04-4280-b7d7-b20e158f345dMer de Noms", "name": "Mer de Noms"}, {"children": [], "data": [{"value": "93", "key": "play count"}, {"value": "24", "key": "rank"}, {"value": "http:\/\/userserve-ak.last.fm\/serve\/130x130\/5614421.jpg", "key": "image"}], "id": "078a9376-3c04-4280-b7d7-b20e158f345dThirteenth Step", "name": "Thirteenth Step"}], "data": [{"value": 216, "key": "play count"}], "id": "078a9376-3c04-4280-b7d7-b20e158f345da", "name": "A Perfect Circle"}, {"children": [{"children": [], "data": [{"value": "109", "key": "play count"}, {"value": "16", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B00005LNP5.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "1fc56cff-f0a0-4ce2-ab1f-ac49cf3b073fElija y Gane", "name": "Elija y Gane"}, {"children": [], "data": [{"value": "85", "key": "play count"}, {"value": "26", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B0000B193V.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "1fc56cff-f0a0-4ce2-ab1f-ac49cf3b073fPara los Arboles", "name": "Para los Arboles"}], "data": [{"value": 194, "key": "play count"}], "id": "1fc56cff-f0a0-4ce2-ab1f-ac49cf3b073fa", "name": "Luis Alberto Spinetta"}, {"children": [{"children": [], "data": [{"value": "87", "key": "play count"}, {"value": "25", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2383135-239175892.jpg", "key": "image"}], "id": "e795e03d-b5d5-4a5f-834d-162cfb308a2c4-Track Demos", "name": "4-Track Demos"}, {"children": [], "data": [{"value": "77", "key": "play count"}, {"value": "32", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/2039787-1138641862.jpg", "key": "image"}], "id": "e795e03d-b5d5-4a5f-834d-162cfb308a2cRid of Me", "name": "Rid of Me"}], "data": [{"value": 164, "key": "play count"}], "id": "e795e03d-b5d5-4a5f-834d-162cfb308a2ca", "name": "PJ Harvey"}, {"children": [{"children": [], "data": [{"value": "102", "key": "play count"}, {"value": "19", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1428028-676341407.jpg", "key": "image"}], "id": "e3e0abcd-7671-4482-a9d8-462f5acc9be5Make Yourself", "name": "Make Yourself"}, {"children": [], "data": [{"value": "84", "key": "play count"}, {"value": "27", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B00018D5CQ.01._SCMZZZZZZZ_.jpg", "key": "image"}], "id": "e3e0abcd-7671-4482-a9d8-462f5acc9be5A Crow Left of the Murder", "name": "A Crow Left of the Murder"}, {"children": [], "data": [{"value": "60", "key": "play count"}, {"value": "46", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1427920-153080025.jpg", "key": "image"}], "id": "e3e0abcd-7671-4482-a9d8-462f5acc9be5Morning View", "name": "Morning View"}], "data": [{"value": 246, "key": "play count"}], "id": "e3e0abcd-7671-4482-a9d8-462f5acc9be5a", "name": "Incubus"}, {"children": [{"children": [], "data": [{"value": "130", "key": "play count"}, {"value": "9", "key": "rank"}, {"value": "http:\/\/userserve-ak.last.fm\/serve\/130x130\/5618401.jpg", "key": "image"}], "id": "38c5cdab-5d6d-43d1-85b0-dac41bde186eNico", "name": "Nico"}, {"children": [], "data": [{"value": "120", "key": "play count"}, {"value": "12", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B00005V5PW.01.MZZZZZZZ.jpg", "key": "image"}], "id": "38c5cdab-5d6d-43d1-85b0-dac41bde186eClassic Masters", "name": "Classic Masters"}, {"children": [], "data": [{"value": "103", "key": "play count"}, {"value": "18", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B000002TPF.01.MZZZZZZZ.jpg", "key": "image"}], "id": "38c5cdab-5d6d-43d1-85b0-dac41bde186eSoup", "name": "Soup"}, {"children": [], "data": [{"value": "99", "key": "play count"}, {"value": "20", "key": "rank"}, {"value": "http:\/\/userserve-ak.last.fm\/serve\/130x130\/5618415.jpg", "key": "image"}], "id": "38c5cdab-5d6d-43d1-85b0-dac41bde186eBlind Melon", "name": "Blind Melon"}], "data": [{"value": 452, "key": "play count"}], "id": "38c5cdab-5d6d-43d1-85b0-dac41bde186ea", "name": "Blind Melon"}, {"children": [{"children": [], "data": [{"value": "173", "key": "play count"}, {"value": "4", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/1756-756643134.jpg", "key": "image"}], "id": "153c9281-268f-4cf3-8938-f5a4593e5df4Superunknown", "name": "Superunknown"}, {"children": [], "data": [{"value": "117", "key": "play count"}, {"value": "13", "key": "rank"}, {"value": "http:\/\/userserve-ak.last.fm\/serve\/130x130\/5269310.jpg", "key": "image"}], "id": "153c9281-268f-4cf3-8938-f5a4593e5df4Louder Than Love", "name": "Louder Than Love"}, {"children": [], "data": [{"value": "96", "key": "play count"}, {"value": "21", "key": "rank"}, {"value": "http:\/\/cdn.last.fm\/coverart\/130x130\/24152-1070383690.jpg", "key": "image"}], "id": "153c9281-268f-4cf3-8938-f5a4593e5df4Down on the Upside", "name": "Down on the Upside"}, {"children": [], "data": [{"value": "95", "key": "play count"}, {"value": "22", "key": "rank"}, {"value": "http:\/\/images.amazon.com\/images\/P\/B000000M4A.01.MZZZZZZZ.jpg", "key": "image"}], "id": "153c9281-268f-4cf3-8938-f5a4593e5df4Ultramega OK", "name": "Ultramega OK"}], "data": [{"value": 481, "key": "play count"}], "id": "153c9281-268f-4cf3-8938-f5a4593e5df4a", "name": "Soundgarden"}], "data": [{"value": 4949, "key": "play count"}], "id": "topAlbums", "name": "top albums"};

    //Serialize json data for further use.
	var jsonEncoded = JSON.encode(json);

	//Treemap options (can also be fed at instanciation time.
	var opt = {
        //main container id.
        rootId: 'infovis',
		//orientation
		orientation: "v",
       //Allow tips for treemap
        tips: true,

	titleHeight: 0,
	offset: 2,
	
        
        Color: {
            //Allow coloring
            allow: true,
        //Set min value and max value for the second *dataset* object values.
        //Default's to -100 and 100.
            minValue: 1,
            maxValue: 50,
        //Set color range. Default's to reddish and greenish. It takes an array of three
        //integers as R, G and B values.
            minColorValue: [0, 255, 50],
            maxColorValue: [255, 0, 50]
            
        },

        //Tooltip content is setted by setting the *title* of the element to be *tooltiped*.
        //Read the mootools docs for further understanding.
        makeTip: function(elem, json) {
            var title = json.name;
            var html = this.makeHTMLFromData(json.data);
            elem.store('tip:title', title);
            elem.store('tip:text', html);
        },
        //Take each dataset object key and value and make an HTML from it.
        makeHTMLFromData: function(data) {
            var html = '';
            html += data[0].key + ': ' + data[0].value + '<br />';
            if(data.length > 1)
                html += data[1].key + ': ' + data[1].value + '<br />';
            if(data.length > 2)
                html += "<img class=\"album\" src=\""+data[2].value+"\" />";
            return html;
        },
        
        onAfterCompute: function() {
            //Set tooltip info in nodes.
            var that = this;
            //Tooltips will be applied to all .leaf and .head dom elements.
            $$('#infovis .leaf', '#infovis .head').each(function(elem, i) {
                var p = elem.getParent();
                if(p) {
                    var sTree = TreeUtil.getSubtree(tm.tree, p.id);
                    if(sTree) that.makeTip(elem, sTree); 
                }
            });
        }
    
    };

	['Squarified', 'Strip', 'SliceAndDice'].each(function(elem) {
		TM[elem].implement({
		   leafBox: function(json, coord) { 
		    var config = this.config; 
		    var backgroundColor = config.Color.allow && this.setColor(json), 
		    offst = config.offset, 
		    width = coord.width - offst, 
		    height = coord.height - offst; 
		    var c = { 
		     'top': (offst / 2) + "px", 
		     'height':height + "px", 
		     'width': width + "px", 
		     'left': (offst / 2) + "px" 
		    };
        var img =  cushion? "<img src=\"gradient.png\" style=\"position:absolute; z-index:2; top:0; left:0; width:" + c.width + "; height:"+ c.height +"; \" />" : ""; 
		    if(backgroundColor) c['background-color'] = backgroundColor; 
		    return "<div class=\"leaf\" style=\"" + this.toStyle(c) + "\">" + img + json.name + "</div>"; 
		   } 
		});
	});
	//You can also use TM.SliceAndDice, TM.Strip.
	var tm = new TM.Squarified(opt);
	//Change rendering layout.
	var s = $('switch');
	s.addEvent('change', function() {
		var index = s.selectedIndex;
		var text = s.options[index].text;
		//Current root
		var id = tm.shownTree.id;
		$('infovis').empty();
	    switch(text) {
			case "Squarified":
			 tm = new TM.Squarified(opt); break;
			case "Slice and Dice":
			 tm = new TM.SliceAndDice(opt); break;
			case "Strip":
			 tm = new TM.Strip(opt); break;
		}
		
		tm.loadFromJSON(JSON.decode(jsonEncoded));
		tm.view(id);
	});

	var ch = $('ch');
	ch.addEvent('click', function() {
		if(ch.checked) {
			opt.titleHeight = 13;
			opt.offset = 4;
		} else {
			opt.titleHeight = 0;
			opt.offset = 2;
		}
		s.fireEvent('change');
	});
	
	var cshn = $('cushion');
	cshn.addEvent('click', function() {
		cushion = !!cshn.checked;		
		tm.view(tm.shownTree.id);
	});
	//Opera does not allow disabling the context menu on right click, so
	//we provide opera users an extra button.
	if(!Browser.Engine.presto) {
		$('opera_right').setStyle('display', 'none');
	} else {
		$('opera_right_button').addEvent('click', function() {
			tm.out();
		});
	}
	tm.loadFromJSON(json);
}
