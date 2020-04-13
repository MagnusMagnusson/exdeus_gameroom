import React, { Component } from 'react';
import { FormControl, Form, Button } from 'react-bootstrap'; 

class GameRoom extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            game: "",
        }
        this.rename = this.rename.bind(this);
        this.emit = this.emit.bind(this);
    }
    rename(name) {
        this.props.emit("rename", name);
        this.setState({
            name: name
        });
    }
    emit(event, data) {
        this.props.emit(event, data);
    }
    render() {
        let games = [
            { name: "Flip the coin", slug: "flip_the_coin" },
            { name: "Press the clown", slug: "press_the_clown" }
        ];
        if (!this.state.name) {
            return <NameEntryField changeName={this.rename} />;
        } else {
            return <GameMenu emit={this.emit} games={games} />;
        }
    }
}

class GameMenu extends Component {
    constructor() {
        super();
        this.state = {
            game : null
        }
    }

    render() {
        if (this.state.game) {
            return <GameController emit={this.props.emit} game={this.state.game}/>;
        } else {
            let gameList = this.props.games.map(x => <Button key={x.slug}>{x.name}</Button>);
            return <div>
                <h3>Please select a game</h3>
                {gameList}
            </div>;
        }
    }
}

class GameController extends Component{
    constructor() {
        super();
        this.gamestates = {
            MATCHSELECT: 0,
            SETTINGS: 1,
            LOBBY: 2,
            INGAME: 3
        }
        this.state = {
            gamestate: this.gamestates.MATCHSELECT
        }
    }
    render() {
        switch (this.state.gamestate) {
            case this.gamestates.MATCHSELECT: {
                return <div>
                    <h1>{this.props.game.name}</h1>
                    <Button>Host game</Button>
                    <MatchList>
                    </MatchList>
                    <Button>Back</Button>
                    <Button>Join</Button>
                </div>;
                break;
            }
            case this.gamestates.SETTINGS: {
                return <div>
                    <h1>Set up game</h1>
                    {this.props.game.settings}
                    <Button>Cancel</Button>
                    <Button>Host!</Button>
                </div>;

                break;
            }
            case this.gamestates.LOBBY: {
                break;
            }
            case this.gamestates.INGAME: {
                return <div>{this.props.game.game}</div>
                break;
            }
        }
    }
}

class NameEntryField extends Component{
    constructor() {
        super();
        this.state = { name: "" };
        this.changeName = this.changeName.bind(this);
    }
    
    changeName() {
        this.props.changeName(this.state.name);
    }

    render() {
        return (<div>
            <h1>Welcome!</h1>
            <Form>
                <Form.Label>Enter your name</Form.Label>
                <Form.Control onChange={e => this.setState({ name:e.target.value })} value={this.state.name} placeholder="YOUR NAME HERE" />
                <Button onClick={this.changeName} variant="primary">Submit Name</Button>
            </Form >
            </div>
        );
    }
}

export { GameRoom}