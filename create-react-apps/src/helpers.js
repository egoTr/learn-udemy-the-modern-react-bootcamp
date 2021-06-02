function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const rgb = `rgb(${r}, ${g}, ${b})`;

    return rgb;
} // randomColor

// https://stackoverflow.com/questions/8584902
function findClosest(arr, goal) {
    var closest = arr.reduce( (prev, curr) => {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    }, arr[0]);

  return closest;
} // findClosest

export { randomColor, findClosest };