import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import Building from './Building';
import Search from './Search';
import Online from './Online';
import Interview from './Interview';
import Campus from './Campus';
import List from './List';
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#12263f',
        border: 'solid',
        borderColor: 'white',
        borderWidth: '0.2rem',
        borderRadius: '5%'
    },
    name: {
        paddingTop: theme.spacing(10)
    },
    date: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(3)
    },
    icon: {
        fontSize: '3rem',
        color: 'grey'
    },
}));

const College = props => {
    const classes = useStyles();
    
    const CollegeWithCard = () => {
        const card = props.college.map((coll, index) => {
            return (
                <Grid key = {index} item sm = {12} md = {6} lg = {4}>
                    <Link to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${coll.url}`} style = {{textDecoration: 'none', color: 'black'}}>
                        <Paper className = {classes.paper}>
                            <div className = {classes.name}>{coll.name}</div>
                            <div className = {classes.date}>{coll.date}</div>
                        </Paper>
                    </Link>
                </Grid>
            );
        });

        return (
            <div className = {classes.root}>
                <div className = 'direction'>
                    <Link to = {props.pathname} style = {{textDecoration: 'none', color: 'black'}}>
                        <ReplyIcon className = {classes.icon} />    
                    </Link>
                </div>
                <Grid container spacing = {3}>
                    {card}
                </Grid>
            </div>
        );
    };
    
    const Components = [
        <Building {...props} subid = {1}/>, 
        <Search {...props} subid = {2}/>, 
        <Online {...props} subid = {3}/>, 
        <Interview {...props} subid = {4}/>, 
        <Campus {...props} subid = {5}/>, 
        <List {...props} subid = {6}/>
    ];

    const Routes = props.college.map((coll, index) => 
        <Route key = {index} path = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${coll.url}`} render = {() => Components[index]} />
    );
    
    return (
        <Router history = {props.history}>
            <Switch>
                <Route exact path = {`${props.pathname}/${props.worksheets[5].worksheet_url}`} component = {CollegeWithCard} />
                {Routes}
            </Switch>
        </Router>
    )
}

export default (withApollo(College));