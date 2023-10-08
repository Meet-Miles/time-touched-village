import type { NextApiRequest, NextApiResponse } from "next"
import { Resend } from "resend"
import { EmailTemplateUser } from "../../components/email"

const resend = new Resend("re_eXy8ADHj_6FvCGjHHRiJDGEtkynu3D8aB")

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body
    try {
        const data = await resend.emails.send({
            from: "Time Touched Village <dev@wearemiles.nl>",
            to: [body.email],
            subject: "Here are your postcards!",
            text: `Thank you for playing! We hope to see you again in the realms of time!`,
            react: EmailTemplateUser({ email: body.email }),
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
}
