import { HttpStatus } from '@nestjs/common';

export default function sendResponse(dataSend: {
    code: HttpStatus;
    msg?: string;
    data: any;
    match_query: number;
    match_ai: number;
    is_table?: boolean;
    is_mark_down?: boolean;
    related?: {
        data: any;
        is_table: boolean;
        is_mark_down: boolean;
    };
    is_point?: boolean;
}) {
    return {
        code: dataSend.code,
        match_query: dataSend.match_query,
        match_ai: dataSend.match_ai,
        is_table: dataSend.is_table || false,
        is_mark_down: dataSend.is_mark_down || false,
        msg: dataSend.msg || 'ok',
        data: dataSend.data,
        is_ai: true,
        related: dataSend.related || null,
        is_point: dataSend.is_point || false,
    };
}
