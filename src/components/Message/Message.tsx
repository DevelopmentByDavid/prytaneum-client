import React from 'react';
import PropTypes from 'prop-types';
// import useJwt from '../../hooks/useJwt';
import MessageList from './MessageList';
import MessageListItem from './MessageListItem';
import MessageItemText from './MessageItemText';
import MessageItemAuthor from './MessageItemAuthor';
import MessageItemTimestamp from './MessageItemTimestamp';
import ScrollToBottom from '../ScrollToBottom';
import { Message } from './types';

const checkIsOwner = (user: { _id: string }, messageUserId = '') =>
    user._id === messageUserId;

// export const MessageContext = React.createContext(false);
// interface Message {
//     _id: string;
//     userId: string;
//     username: string;
//     message: string;
//     moderated: boolean;
//     sent: number;
// }

interface Props {
    messages: Message[];
    onClickMessage: (mId: string) => void;
}
function Messages({ messages, onClickMessage }: Props) {
    // const [, user] = useJwt();
    const user = { _id: '' }; // PLACEHOLDER TODO: remove this/fix this

    // const filterQuestions = () => {
    //     if (!Array.isArray(messages)) {
    //         console.log('message is not an array');
    //         return [];
    //     }
    //     if (moderator) {
    //         return messages.filter((m) => {
    //             if (filter.moderated && m.moderated) {
    //                 // show message that m.moderated === true
    //                 return true;
    //             }
    //             if (filter.normal && !m.moderated) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }
    //     return messages.filter((m) => !m.moderated);
    // };
    // const isOwnerOrModerator = (sentBy) => checkIsOwner(user, sentBy);
    // console.log(isOwnerOrModerator());
    return (
        <ScrollToBottom active>
            {/* <MessageContext.Provider value={moderator}> */}
            <MessageList>
                {messages.map(
                    ({ _id, userId, username, message, moderated, sent }) => (
                        <MessageListItem
                            key={_id}
                            hidden={moderated}
                            button={checkIsOwner(user, userId)}
                            onClick={() => onClickMessage(_id)}
                        >
                            <MessageItemTimestamp time={sent} />
                            <MessageItemAuthor name={username} />
                            <MessageItemText text={message} />
                        </MessageListItem>
                    )
                )}
            </MessageList>
            {/* </MessageContext.Provider> */}
        </ScrollToBottom>
    );
}

Messages.defaultProps = {
    messages: [],
};

Messages.propTypes = {
    messages: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            userId: PropTypes.string,
            username: PropTypes.string,
            message: PropTypes.string,
            moderated: PropTypes.bool,
        })
    ),
    onClickMessage: PropTypes.func.isRequired,
    // moderator: PropTypes.bool.isRequired,
};

export default Messages;