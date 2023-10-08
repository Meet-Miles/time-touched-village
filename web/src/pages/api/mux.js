import Mux from "@mux/mux-node"

const { Video } = new Mux(
    "3db1f60d-6303-4632-b29d-b535ea74bf90",
    "amGEgE8mRDlHvmDddo2Q9iojPLwFrt65wS56+dpjzTy9rRXYG7Vz8tDpGrCsffPEok3y2M4Afdm"
)

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const asset = await Video.Assets.create({
                input: "https://timetouchedvillage.nl/video/mission-7.mp4",
                playback_policy: "public",
            })
            res.status(200).json(asset)
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    } else {
        res.status(405).json({ error: "Method not allowed" })
    }
}
