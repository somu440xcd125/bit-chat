import { MessageSquare } from "lucide-react"; // Import the message icon from Lucide React

// Define the NoChatSelected component
const NoChatSelected = () => {
    return (
        // Main container with flexbox to center content
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
            {/* Inner container with spacing and text centering */}
            <div className="max-w-md text-center space-y-6">
                
                {/* Icon Display Section */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        {/* Animated bouncing icon */}
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                            <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-2xl font-bold">Welcome to ByteChat!</h2>
                <p className="text-base-content/60">
                    Select a conversation from the sidebar to start chatting
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected; // Export the component for use in other parts of the app
