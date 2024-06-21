import Button from "./Button"
import { useNavigate } from "react-router-dom";





function BackButton() {
    const navigate = useNavigate();
    
    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1); // This will navigate back
      };


    return (
        <Button onClick={handleBack} type="back">
        &larr; Back
      </Button>
    )
}

export default BackButton
