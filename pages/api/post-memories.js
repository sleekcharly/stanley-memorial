import addData from '@/firebase/addData';
import nc from 'next-connect';

const handler = nc();

handler.post(async (req, res) => {
  console.log('handler');
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Message content is empty' });
  }

  // set full name
  let fullName = `${req.body.firstName} ${req.body.lastName}`;

  // extract message body
  let newMessage = {
    body: req.body.body,
    fullName: fullName,
    createdAt: new Date().toISOString(),
  };

  // post to database
  await addData(newMessage)
    .then((doc) => {
      return res.json(newMessage);
    })
    .catch((err) => {
      console.error(err);
    });
});

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
};
