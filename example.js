let fieldKey='';
let contentType="",

let api = {
    METHOD: "GET",
    params: {containerKey: pageKey},
    response: {
	data: [
	//SECTION DATA
	{
		key: sectionKey,
		pageKey: pageKey,
		singleContents: [
			{key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
		],
		collectionContents: [
			{
                key: collectionKey, //sliders
                values:  [
                   {
                    key: "slider1",
                    value: [
                        {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
                        {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
                        {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
                    ]
                   }
                ] 
            },
		]
	}
    ]
}
}

let expect = {
    homepage: {
        section1: {
            field1: {vi: 'a', en:'b'},
            field2: "aaaa",
            sliders: [
                {
                    field1: {vi: 'a', en:'b'},
                    field2: "aaaa",
                    imgUrl1: {tyle: 'img', value: ''} 
                },
                {
                    
                }
            ],
            tabs: []
        },
        section2: {
            field: b
        },
        field: c,

    },
    footer: {

    }
}

sliders: [
    {
        key: "slider01",
        value: [
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
        ]
    },
    {
        key: "slider01",
        value: [
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
            {key: fieldKey, value: {vi: "Viet", en: "English", all: "For None Locale Content"}, type: contentType, },
        ]
    }
]