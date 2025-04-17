import LogoutBotton from "../components/LogoutBotton";
import { Box } from "@chakra-ui/react"

const SideBox = () => {
    return (
        <Box background="tomato" width="20%" hight="100" color="white">
            This is the Box
        </Box>
    )
}

export default function Dashboard() {

    return (
        <div>
            <h1>Dashboard</h1>
            <p>DashDashDash</p>
            <LogoutBotton />
            <SideBox/>
        </div>
    )
}