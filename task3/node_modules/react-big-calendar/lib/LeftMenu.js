import PropTypes from 'prop-types';
import React from 'react';
import { Checkbox, Drawer, FloatingActionButton, List, ListItem, MuiThemeProvider } from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close'

class LeftMenu extends React.Component {
  constructor(props){
    super(props)

    this.state = {data: props.data}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.open) {
      this.setState({data: nextProps.data})
    }
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    onItemVisibilityChange: PropTypes.func,
    onClose: PropTypes.func.isRequired
  };

  static defaultProps = {
    open: true,
    data: []
  };

  itemVisibilityChanged (mainId, subId) {
    const data = this.state.data

    data.find(mainItem => {
      if (mainItem.id === mainId) {
        mainItem.data.find(subItem => {
          if (subItem.id === subId) {
            subItem.visible = !subItem.visible
            return true
          }
        })
        return true
      }
    })

    this.props.onItemVisibilityChange(data)
  }

  render() {
    return (
      <MuiThemeProvider>
        <Drawer
          open={this.props.open}
          docked={false}
          onRequestChange={open => { this.setState({open}) }}>
          <FloatingActionButton
            mini
            style={{position: 'relative', float: 'right', marginTop: '5px', marginRight: '5px', boxShadow: 'none'}}
            backgroundColor='none'
            iconStyle={{color: 'rgb(117, 117, 117)', fill: 'rgb(117, 117, 117)'}}
            onClick={this.props.onClose}>
            <NavigationClose />
          </FloatingActionButton>
          <List style={{marginTop: '25px'}}>
            {
              this.state.data.map((data, idx) => {
                return (
                  <div key={`div-${data.id}`}>
                    <span
                      key={`span-${data.id}`}
                      style={{marginLeft: '15px', color: 'rgb(117, 117, 117)'}}>
                        {data.title}
                    </span>
                    <hr
                      key={`hr-${data.id}`}
                      style={{marginTop: '4px'}} />
                    {
                      data.data.map(item => {
                        return(
                          <ListItem
                            key={item.id}
                            primaryText={item.name}
                            style={{marginTop: '-8px', padding: '8px 8px 8px 72px', fontWeight: '300', fontSize: '14px', color: 'rgb(33, 33, 33)'}}
                            leftCheckbox={
                              <Checkbox
                                key={`checkbox-${item.id}`}
                                style={{top: '3px'}}
                                checked={item.visible}
                                onCheck={() => { this.itemVisibilityChanged(data.id, item.id) }}
                                iconStyle={{color: `${item.color}`, fill: `${item.color}`}}/>
                            }
                          />
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </List>
        </Drawer>
      </MuiThemeProvider>
    )
  }
}

export default LeftMenu;
