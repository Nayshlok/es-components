## Alert Types

```
<div>
  <Alert
    type="success"
    header="Success!"
    additionalText="You did a thing."
  />

  <Alert
    type="information"
    header="Information!"
    additionalText="Here's some information you need to know."
  />

  <Alert
    type="warning"
    additionalText="Here's a warning."
  />

  <Alert
    type="danger"
    header="Danger!"
    additionalText="You're about to do something dangerous!"
  />

  <Alert
    type="advisor"
    header="Advisor!"
    additionalText="This message is for benefit advisors."
  />
</div>
```

Adding the ``dismissable`` prop will render a dismiss button that will execute the provided ``onDismiss`` function.
```
<Alert
  type="success"
  additionalText="I have a dismiss button. Click it!"
  dismissable
  onDismiss={() => alert('Why so dismissive?')}
/>
```

Adding the ``includeIcon`` prop will render an appropriate icon for the alert type.
```
<Alert
  type="advisor"
  additionalText="Please read"
  includeIcon
/>
```

Providing ``callsToAction`` will render a button for each which executes that action. The first button will receive the ``btn-primary`` class and any additional button will receive the ``btn-default`` class.
```

const callsToAction = [
      {
        actionButtonContent: 'Primary',
        action() {
          confirm('You clicked a button!');
        }
      },
      {
        actionButtonContent: 'Secondary',
        action() {
          alert('You clicked the secondary button')
        }
      },
      {
        actionButtonContent: 'Tertiary',
        action() {
          alert('You clicked the tertiary button')
        }
      }
    ];
<Alert
  type="warning"
  header="Action is required"
  additionalText="Please click one of the buttons"
  callsToAction={callsToAction}
/>
```

Providing ``extraNotificationText`` will render a bell icon and the provided text in the upper-right corner of the alert.
```
<Alert
  type="success"
  additionalText="Look at the extra notification!"
  extraNotificationText="I'm a notification!"
/>
```

Any additional children will get rendered before call to action buttons.
```
<Alert
  type="information"
  additionalText="Here's some information to get you started"
>
  <ol>
    <li>Item A</li>
    <li>Item B</li>
    <li>Item C</li>
  </ol>
</Alert>
```