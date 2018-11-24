import React from 'react';
import { Card, Image, Feed, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import Note from '/imports/ui/components/Note';
import AddNote from '/imports/ui/components/AddNote';
import { Bert } from 'meteor/themeteorchef:bert';
import { StudentInfo } from '/imports/api/studentinfo/studentinfo';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentCard extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.deleteCallback = this.deleteCallback.bind(this);
    }

    deleteCallback(error) {
        if (error) {
            Bert.alert({ type: 'danger', message: `Delete failed: ${error.message}` });
        } else {
            Bert.alert({ type: 'success', message: 'Delete succeeded' });
        }
    }

    onClick() {
        /* eslint-disable-next-line */
        if (confirm("Do you really want to delete this contact?")) {
            Contacts.remove(this.props.contact._id, this.deleteCallBack);
        }
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Image size='mini' floated='right' src={this.props.contact.image}/>
                    <Card.Header>
                        {this.props.contact.firstName} {this.props.contact.lastName}
                    </Card.Header>
                    <Card.Meta>
                        {this.props.contact.address}
                    </Card.Meta>
                    <Card.Description>
                        {this.props.contact.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Link to={`/edit/${this.props.contact._id}`}>Edit</Link>
                </Card.Content>
                <Card.Content extra>
                    <Feed>
                        {this.props.notes.map((note, index) => <Note key={index} note={note}/>)}
                    </Feed>
                    <AddNote owner={this.props.contact.owner} contactId={this.props.contact._id}/>
                </Card.Content>
                <Card.Content extra>
                    <Button basic onClick={this.onClick}>
                        Delete
                    </Button>
                </Card.Content>
            </Card>
        );
    }
}

/** Require a document to be passed to this component. */
StudentCard.propTypes = {
    contact: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StudentCard);