import boto3

sns = boto3.resource('sns')
topic = sns.Topic('arn:aws:sns:ca-central-1:548331012494:ResBuiildEmail')
topic.publish(Subject='Test #2', Message='The message')
