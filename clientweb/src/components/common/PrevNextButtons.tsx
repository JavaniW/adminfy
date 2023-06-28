interface Props {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  disabled: { prevDisabled: boolean; nextDisabled: boolean };
}

export const PrevNextButtons: React.FunctionComponent<Props> = (props) => {
  return (
    <>
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
    </>
  );
};

export default PrevNextButtons;
