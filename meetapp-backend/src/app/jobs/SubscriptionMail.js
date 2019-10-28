import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    await Mail.sendMail({
      to: `${meetup.User.name}<${meetup.User.email}>`,
      subject: `Nova inscrição no meetup ${meetup.title}`,
      template: 'subscription',
      context: {
        title: meetup.title,
        creator: meetup.User.name,
        name: user.name,
        email: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
