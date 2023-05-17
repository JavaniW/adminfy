import "../../styles/Spinner.css";

interface Props {}

export const Spinner: React.FunctionComponent<Props> = (props) => {
    
  return (
    <div className="loader-container">
        <div className="loader"></div>
    </div>
  );
};
