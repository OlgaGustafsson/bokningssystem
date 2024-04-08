import { Key, ReactNode } from "react";

export interface Booking {
    user_name: ReactNode;
    room_name: ReactNode;
    game_category: ReactNode;
    time: ReactNode;
    booking_id: number;
    booking_user_id: number;
    booking_room_id: number;
    booking_game_id?: number;
    booking_description?: string;
    booking_date: Date;
    booking_private?: boolean;
    booking_deleted?: boolean;
    booking_time_id: number;
    booking_max_players?: number;
  }

export interface Game {
    game_id: number;
    game_category: string;
  }
  
export interface Time {
    time_id: number;
    time: string;
}

export interface Room {
    room_id: number;
    room_name: string;
  }

  export interface User {
    user_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
  }
  
