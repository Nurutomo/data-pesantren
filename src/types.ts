export enum REGIONAL_CODE {
    'Unknown' = 0,
    'MALANG RAYA' = 1,
    'BLITAR' = 2,
    'TULUNGAGUNG TRENGGALEK' = 3,
    'PLAT AE' = 4,
    'BANYUWANGI' = 5,
    'OJO LAMBAN' = 6,
    'KEDIRI' = 7,
    'JOMBANG' = 8,
    'MOJOKERTO' = 9,
    'DAPIL IV' = 10,
    'NGANJUK' = 11,
    'MADURA RAYA' = 12,
    'PROBOLINGGO RAYA' = 13,
    'GRESIK SBY' = 14,
    'SIDOPAS' = 15,
}

export interface AdminPondok {
    name: string
    phoneNumber: string
}

export interface Pondok {
    regDate?: string
    regionalCode: REGIONAL_CODE
    name: string
    address: string
    city: string
    principal: string
    email: string
    admins?: AdminPondok[]
    linkMap?: string
    memberCount?: number
}
