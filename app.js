/*
Build a Camper Leaderboard
Objective: Build a CodePen.io app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/eZGMjp/.
User Story: I can see a table of the freeCodeCamp campers who've earned the most brownie points in the past 30 days.
User Story: I can see how many brownie points they've earned in the past 30 days, and how many they've earned total.
User Story: I can toggle between sorting the list by how many brownie points they've earned in the past 30 days and by how many brownie points they've earned total.
Hint: To get the top 100 campers for the last 30 days: https://fcctop100.herokuapp.com/api/fccusers/top/recent.
Hint: To get the top 100 campers of all time: https://fcctop100.herokuapp.com/api/fccusers/top/alltime.
*/

function Camper(props) {
    var url="https://www.freecodecamp.com/" + props.name;
    return (
      <tr>
        <td>{props.index+1}</td>
        <td><img src={props.image} /></td>
        <td><a href={url} target="_blank">{props.name}</a></td>
        <td className="fullWidth">&nbsp;</td>
        <td>{props.pointsRecent}</td>
        <td>{props.pointsAllTime}</td>
      </tr>
    )
  }
  
  class Leaderboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        campers: [],
        sortBy: "allTime"
      };
      this.fetchRecent = this.fetchRecent.bind(this);
      this.fetchAllTime = this.fetchAllTime.bind(this);
      this.fetchAllTime();
    }
    
    fetchRecent() {
      var campers = [];
      var saveThis = this;
      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          campers = json.map(text => {return ({name: text.username, image: text.img, pointsRecent: text.recent, pointsAllTime: text.alltime})});
          saveThis.setState({campers: campers, sortBy: "recent"});
        }); 
    }
    
    fetchAllTime() {
      var campers = [];
      var saveThis = this;
      fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          campers = json.map(text => {return ({name: text.username, image: text.img, pointsRecent: text.recent, pointsAllTime: text.alltime})});
          saveThis.setState({campers: campers, sortBy: "allTime"});
        }); 
    }
    
    render() {
      if (this.state.sortBy == "allTime") {
        var classRecent = "";
        var classAllTime = "downArrow";
      } else {
        var classRecent = "downArrow";
        var classAllTime = "";
      }
      
      return (
        <div>
          <div id="sig">By David Ivey</div>
          <h1>FCC Leader Board</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th colSpan={3}>Camper Name</th>
                <th onClick={this.fetchRecent}>Points<br/>Past 30 Days<div className={classRecent} /></th>
                <th onClick={this.fetchAllTime}>Points<br/>All Time<div className={classAllTime} /></th>
              </tr>
            </thead>
            <tbody>
              {this.state.campers.map((text, i) => {
                 return(<Camper 
                        key={i} 
                        index={i} 
                        name={text.name}
                        image={text.image}
                        pointsRecent={text.pointsRecent}
                        pointsAllTime={text.pointsAllTime}>
                      </Camper>);
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Leaderboard />,
    document.getElementById('root')
  );