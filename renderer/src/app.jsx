function App(props) {
  let [clicked, setClicked] = React.useState(false);

  let content = clicked ?
    <div>
      <p>You liked this</p>
      <Test/>
      <Test2/>
    </div> :
    <button onClick={() => {setClicked(true)}}>Like</button>;
  
  return content;
}

let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);