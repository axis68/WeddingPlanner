function Button({ formName, isDisabled, onCancelFormHandler }) {
    return (
        <div className="form-btns-wrapper">
            <button disabled={isDisabled} className="btn btn-center" type="button">{formName}</button>
            <button onClick={onCancelFormHandler} className="btn btn-center" type="button">Cancel</button>
        </div>
    );
}

export default Button;