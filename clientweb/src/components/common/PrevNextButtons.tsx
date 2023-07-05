import "../../styles/PrevNextButtons.css";
interface Props {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  disabled: { prevDisabled: boolean; nextDisabled: boolean };
  show?: boolean;
}

export const PrevNextButtons: React.FunctionComponent<Props> = (props) => {
  if (!props.show) return null;

  return (
    <div className="pagination-buttons">
      <button
        className="prev-paginated-page-button"
        onClick={props.onPrev}
        disabled={props.disabled.prevDisabled}
      >
        Prev
      </button>
      <button
        className="next-paginated-page-button"
        onClick={props.onNext}
        disabled={props.disabled.nextDisabled}
      >
        Next
      </button>
    </div>
  );
};

export default PrevNextButtons;
