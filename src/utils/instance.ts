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

export const instanceDataSector: {
    title: string;
    keyword: string[];
    code: number | string;
}[] = [
    {
        title: 'Khoa công nghệ thông tin',
        keyword: ['cntt', 'khoa công nghệ thông tin'],
        code: 7480201,
    },
    {
        title: 'Công nghệ dệt, may',
        keyword: ['cndm', 'khoa Công nghệ dệt, may', 'dệt may'],
        code: 7540204,
    },
    {
        title: 'CNKT điện tử - viễn thông',
        keyword: ['khoa cnkt điện tử viễn thông', 'viễn thông', 'khoa điện tử viễn thông'],
        code: 7510302,
    },
    {
        title: 'Đại Học Kinh Tế Kỹ Thuật Công Nghiệp Hà Nội',
        keyword: [
            'uneti',
            'uneti hà nội',
            'đại học kinh tế kỹ thuật công nghiệp',
            'trường đại học kinh tế kỹ thuật công nghiệp hà nội',
        ],
        code: 'dkk',
    },
];

export enum codeData {
    'IDSCHOOL' = 'dkk',
}

export enum ModelWitEnum {
    i_co_so = '377654348051944',
    i_co_so_vat_chat = '800297008894684',
    i_dao_tao = '1042106483707534',
    i_dia_chi = '1034863804387853',
    i_ma_truong_xet_tuyen = '661966659448580',
    i_point = '328206370126312',
    i_thong_tin_khoa = '1126778305232475',
}
