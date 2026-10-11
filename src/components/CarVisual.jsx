
function CarVisual({ carRef }) {
  return (
    <div className="car-visual">
      <img
        ref={carRef}
        className="car-image"
        src="/images/car.png"
        alt="Orange sports car viewed from above"
        draggable="false"
      />
    </div>
  );
}

export default CarVisual;