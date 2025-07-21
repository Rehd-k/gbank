
import { NextResponse, NextRequest } from "next/server";
import { customAlphabet } from 'nanoid';
import User from "../../../../model/user";
import dbConnect from "@/libs/dbconnect";

const nanoid = customAlphabet('1234567890', 10)

export async function GET(request: NextRequest) {
    let user;


    await dbConnect()
    const emailParam = request.nextUrl.searchParams.get("email")!;

    const usernameParam = request.nextUrl.searchParams.get("username")!;

    if (emailParam) {
        const savedUser = await User.findOne({
            email: emailParam,

        })
        user = savedUser
    } else if (usernameParam) {
        const savedUser = await User.findOne({
            username: usernameParam
        })
        user = savedUser
    }

    return NextResponse.json({ user });
}

export async function POST(request: NextRequest) {
    await dbConnect()
    const body = await request.json()

    try {
        const savedInfo = await User.create({
            account_Number: nanoid(),
            account_type: 'Savings',
            balance: 0,
            DOB: body.DOB,
            answer: body.answer,
            city: body.city,
            password: body.password,
            country: body.country_of_residence,
            email: body.email,
            firstName: body.firstName,
            first_address: body.first_address,
            gender: body.gender,
            id_card_number: body.id_card_number,
            id_card_type: body.id_card_type,
            lastName: body.lastName,
            middleName: body.middleName,
            mothers_maiden_name: body.mothers_maiden_name,
            nationality: body.nationality,
            occupation: body.occupation,
            phone_no: body.phone_no,
            second_address: body.second_address,
            securityQuestion: body.securityQuestion,
            username: body.username,
            zip_code: body.zip_code,
            state: body.state,
            status: 'processing',
            currency: (() => {
                const countryCurrencyMap: { [key: string]: string } = {
                    // North America
                    'United States': '$',
                    'Canada': 'CA$',
                    'Mexico': 'MX$',
                    'Greenland': 'kr',
                    'Bermuda': 'BD$',
                    'Saint Pierre and Miquelon': '€',
                    'Guatemala': 'Q',
                    'Belize': 'BZ$',
                    'El Salvador': '$',
                    'Honduras': 'L',
                    'Nicaragua': 'C$',
                    'Costa Rica': '₡',
                    'Panama': 'B/.',
                    'Jamaica': 'J$',
                    'Haiti': 'G',
                    'Dominican Republic': 'RD$',
                    'Cuba': '$',
                    'The Bahamas': 'B$',
                    'Barbados': 'Bds$',
                    'Saint Lucia': 'EC$',
                    'Saint Vincent and the Grenadines': 'EC$',
                    'Grenada': 'EC$',
                    'Trinidad and Tobago': 'TT$',
                    'Saint Kitts and Nevis': 'EC$',
                    'Antigua and Barbuda': 'EC$',
                    'Dominica': 'EC$',
                    // Europe
                    'Albania': 'L',
                    'Andorra': '€',
                    'Armenia': '֏',
                    'Austria': '€',
                    'Azerbaijan': '₼',
                    'Belarus': 'Br',
                    'Belgium': '€',
                    'Bosnia and Herzegovina': 'KM',
                    'Bulgaria': 'лв',
                    'Croatia': '€',
                    'Cyprus': '€',
                    'Czech Republic': 'Kč',
                    'Denmark': 'kr',
                    'Estonia': '€',
                    'Finland': '€',
                    'France': '€',
                    'Georgia': '₾',
                    'Germany': '€',
                    'Greece': '€',
                    'Hungary': 'Ft',
                    'Iceland': 'kr',
                    'Ireland': '€',
                    'Italy': '€',
                    'Kazakhstan': '₸',
                    'Kosovo': '€',
                    'Latvia': '€',
                    'Liechtenstein': 'CHF',
                    'Lithuania': '€',
                    'Luxembourg': '€',
                    'Malta': '€',
                    'Moldova': 'L',
                    'Monaco': '€',
                    'Montenegro': '€',
                    'Netherlands': '€',
                    'North Macedonia': 'ден',
                    'Norway': 'kr',
                    'Poland': 'zł',
                    'Portugal': '€',
                    'Romania': 'lei',
                    'Russia': '₽',
                    'San Marino': '€',
                    'Serbia': 'дин',
                    'Slovakia': '€',
                    'Slovenia': '€',
                    'Spain': '€',
                    'Sweden': 'kr',
                    'Switzerland': 'CHF',
                    'Turkey': '₺',
                    'Ukraine': '₴',
                    'United Kingdom': '£',
                    'Vatican City': '€',
                };
                return countryCurrencyMap[body.country_of_residence] || '$';
            })(),
        })
    

        return NextResponse.json(savedInfo);
    } catch (err) {
      
        throw new Error(err as string)
    }

}
