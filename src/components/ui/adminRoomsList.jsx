import {useSelector} from "react-redux";
import {getBookings} from "../store/bookings";
import {DateTime, Interval} from "luxon";


const AdminRoomsList=({rooms, queryDate})=>{
    const bookings= useSelector(getBookings())
    console.log('DateTime.fromISO(queryDate) , ',DateTime.fromISO(queryDate))
    function getRoomStatus(rId){
        if (bookings){
            const bookingsForRoom=bookings.filter((b)=>{return b.roomId===rId})
            console.log('bookingsForRoom ',bookingsForRoom)
           if( bookingsForRoom){
               console.log('Найдена бронь комнаты')
               const isBooking=bookingsForRoom.some((b)=> {
                   const i = Interval.fromDateTimes(DateTime.fromISO(b.checkin), DateTime.fromISO(b.checkout));
                   console.log('Interval from booking dates: ', i.toString())
                   console.log('contains? ',i.contains(DateTime.fromISO(queryDate)))
                   return i.contains(DateTime.fromISO(queryDate))
               })
               const color=isBooking?"danger":"success "
               console.log('color ', color)
               return color
           }else return "success"
            // запросим все брони для каждой комнаты, фильтровать данные буду на клиенте, на сервере только по одному ключу фильтруется.

        }
    }


    return (
        <div className="row row-cols-1 row-cols-md-4 g-4">
            {rooms.map((room)=>{
            return <div className="col" key={room._id}>
                <div className={"card h-100 bg-"+getRoomStatus(room._id)}>
                <div className="card-body">
                <h5 className="card-title  text-center">{room.number}</h5>
                <p className="card-text text-center">{room.name}</p>
            </div>
            </div>
            </div>
            })
            }


        </div>
    );
};

export default AdminRoomsList