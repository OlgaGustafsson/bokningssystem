import { Booking } from "@/interface";
import { formatDate } from "@/utils/formatDate";

interface Props {
    booking: Booking;
}


export default function GameComponent(props: Props) {
    return(
        <tr>
            <td className="border border-solid p-2">{props.booking.booking_id}</td>
            <td className="border border-solid p-2">{formatDate(props.booking.booking_date)}</td>
            <td className="border border-solid p-2">{props.booking.user_name}</td>
            <td className="border border-solid p-2">{props.booking.room_name}</td>
            <td className="border border-solid p-2">{props.booking.game_category}</td>
            <td className="border border-solid p-2">{props.booking.time}</td>
            <td className="border border-solid p-2">{props.booking.booking_description}</td>
            <td className="border border-solid p-2">{props.booking.booking_max_players}</td>
        </tr>
    );
}