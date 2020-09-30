import queryString from "query-string";

export const shuffle = (array) => {
  let m = array.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

export const retrieveName = (updateName) => {
  console.log('retrieving Name');
  let { name} = queryString.parse(window.location.search);
  updateName(name);
}

export const retrieveRoom = (updateRoom) => {
  console.log('retrieving Room');
  let { room } = queryString.parse(window.location.search);
  updateRoom(room);
}

export const retrieveNameAndRoom = ({updateName}, {updateRoom}) => {
  retrieveName(updateName);
  retrieveRoom(updateRoom);
}