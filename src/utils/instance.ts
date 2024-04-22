export const instanceData: {
    instance: string;
    value: string;
}[] = [
    {
        instance: 'dao_tao',
        value: 'chuyên nghành đào tạo',
    },
    {
        instance: '7480201',
        value: '',
    },
];


export const instanceDataSector  : {
    title: string,
    keyword: string[],
    code: number | string,
}[] = [
    {
        title: "Khoa công nghệ thông tin",
        keyword:[
            "cntt", 'khoa công nghệ thông tin'
        ],
        code: 7480201
    },
    {
        title: "Công nghệ dệt, may",
        keyword:[
            "cndm", 'khoa Công nghệ dệt, may',"dệt may"
        ],
        code: 7540204
    },
    {
        title: "CNKT điện tử - viễn thông",
        keyword:[
            "khoa cnkt điện tử viễn thông", 'viễn thông',"khoa điện tử viễn thông"
        ],
        code: 7510302
    },
    {
        title:"Đại Học Kinh Tế Kỹ Thuật Công Nghiệp Hà Nội",
        keyword:[
            "uneti", "uneti hà nội", "đại học kinh tế kỹ thuật công nghiệp", "một số thông tin về trường", "thông tin về trường mình", "trường đại học kinh tế kỹ thuật công nghiệp hà nội"
        ],
        code: 'dkk'
    }
]

export enum codeData {
    "IDSCHOOL" = "DKK"
}