export default interface roomModel {
    identification?: string;
    title: string; 
    imgUrl?: string;
    isBooked?: boolean;
    author: string;
    info: string;
    bookedBy?: string; 
    address? : string;
    comment : [];
    rating : [];
}