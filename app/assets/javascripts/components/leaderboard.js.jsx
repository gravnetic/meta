var Button = require('./ui/button.js.jsx')
var LoveStore = require('../stores/love_store')
var LoveActionCreators = require('../actions/love_action_creators')
var Icon = require('./ui/icon.js.jsx')
var IconToggler = require('./ui/icon_toggler.js.jsx')
var IconWithNumber = require('./ui/icon_with_number.js.jsx')
var SvgIcon = require('./ui/svg_icon.js.jsx');
const Tile = require('./ui/tile.js.jsx')
const Nav = require('./ui/nav.js.jsx')

var Leaderboard = React.createClass({

  getInitialState: function() {
    return {
      rank_data: [],
      show_all: false
    }
  },

  componentDidMount: function() {
    $.ajax({
      url: '/leaderboards',
      method: 'GET',
      success: function(data) {
          this.setState({rank_data: data});

      }.bind(this)
    });

  },

  renderCategories: function(rank_data) {
    var click = function(event) {
      event.stopPropagation()
      event.preventDefault()
      this.setState({show_all: !this.state.show_all})
    }.bind(this)

    var a = _.pairs(rank_data)

    if (this.state.show_all) {
      var showAllLink = <Nav.Item label="Hide" onClick={click} small={true} />
      var category_rankings = a.map(function(c){
          var name = c[0]
          var rankd = c[1]
          return this.renderCategory(name, rankd);
      }.bind(this))
      return (
        <div>
          {category_rankings}
          <div className="center">
            {showAllLink}
          </div>
        </div>
      )
    }
    else {
      var showAllLink = <Nav.Item label="Show all" onClick={click} small={true} />
      return (
        <div>
          {this.renderCategory("Overall", rank_data['Overall'])}
          <div className="center">
            {showAllLink}
          </div>
        </div>
      )
    }

  },

  renderCategory: function(name, rankd) {

    return (
      <div>
        <p className="h5 gray-1">{name}</p>
        <table>
          <tbody>
              {_.map(rankd, function(d) {
                return (
                  <tr>
                    <td className="gray-2">{d[1]}</td>
                    <td>
                      <a href={d[2]}>
                        {d[0]}
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  },

  render: function() {
    return (
      <div className="py2">
        <Tile>
          <p className="center py2 h4 gray-1 bold">Recent Awards Leaderboard</p>
          {this.renderCategories(this.state.rank_data)}
        </Tile>
      </div>
    )
  }

})

module.exports = Leaderboard
