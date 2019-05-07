import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  });


export default class SellerFaq extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };
    render() {

        const { classes } = this.props;
        const { expanded } = this.state;
    
        return (

            <div className="faq-page seller-faq">
                <div className="hero-section seller-faq-banner">
                    <div className="container">
                        <div className="banner-content">
                            <h1>Seller FAQ</h1>
                        </div>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-5 col-figure">
                        <div className="section-header" data-aos="fade-up" data-aos-duration="1000">
                            <h3 className="section-title"><span>Have</span><br/>questions about Offerlane?</h3>
                        </div>
                          <div className="figure-image">
                            <img src={require('../../../assets/img/faq-object.png')} alt="" />
                          </div>
                        </div>
                        <div className="col-sm-7 col-content">
                        <div>
                            
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}  className="header-title-wrap">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="header-title">Lorem ipsum dolor sit amet, consectetur adipiscing?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. 
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}  className="header-title-wrap">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="header-title">Lorem ipsum dolor sit amet, consectetur ?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}  className="header-title-wrap">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="header-title">Dolor sit amet, consectetur adipiscing?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}  className="header-title-wrap">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="header-title">Sit amet, consectetur adipiscing dolor?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5    ')}  className="header-title-wrap">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="header-title">Sit amet, consectetur adipiscing dolor?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}  className="header-title-wrap">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="header-title">Sit amet, consectetur adipiscing dolor?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}  className="header-title-wrap">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="header-title">Dolor sit amet, consectetur adipiscing?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="panel-details">
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
                        </div>
                      </div>  


                    </div>
                </div>
            </div>
        )

    }

}
SellerFaq.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  
  
  