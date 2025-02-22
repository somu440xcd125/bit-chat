import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";



const BASE_URL=import.meta.env.MODE ==="development" ?"http://localhost:5001":"/";


export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigninUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isChekingAuth:true,
    onlineUsers:[],

    socket:null,

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {   
            console.log("error in check auth",error)
            set({authUser:null})
            
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    signUp:async(data)=>{
    
        set({isSigninUp:true})


        try {

          const res = await axiosInstance.post("auth/signup",data)
          set({authUser:res.data})
          toast.success("Acount created successfully")
          get().connectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isSigninUp:false})
        }

    },

    logout:async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("logged out successfully")
            get().disConnectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }

    },
    login: async (formData) => {
        try {
            const response = await axiosInstance.post("/auth/login", formData);
            set({ authUser: response.data });
            toast.success("Logged in successfully");

            get().connectSocket();


        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
        finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile: async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("auth/update-profile",data)
            set({authUser:res.data});
            toast.success("profile update successfully")
            
        } catch (error) {
            console.log("error in updating profile",error)
            toString.error(error.response.data.message)
            
        }
        finally{
            set({isUpdatingProfile:false})
        }

    },
    connectSocket:()=>{
        const{authUser}=get()
        if(!authUser||get().socket?.connected) return;
        const socket=io(BASE_URL,{
            query: { userId: authUser._id },
        });
        socket.connect();
        set({socket:socket  })

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })

    },
    disConnectSocket:()=>{
        if(get().socket?.connected) {
            get().socket.disconnect();
        }
    },



}));