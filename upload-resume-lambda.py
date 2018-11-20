import json
import boto3
import io
import zipfile
import mimetypes

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:ca-central-1:548331012494:ResBuiildEmail')

    try:
        s3 = boto3.resource('s3')

        portfolio_bucket = s3.Bucket('resume.vrfuture.com')
        build_bucket = s3.Bucket('resumebuild.vrfuture.com')
        portfolio_zip = io.BytesIO()

        build_bucket.download_fileobj('BuildResume.zip', portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj=myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj,nm,
                    ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
                print(nm)

        topic.publish(Subject='Deployment done', Message='ResumeBuild deployed')
    except:
        topic.publish(Subject='Deployment failed', Message='ResumeBuild failed')
        raise

    return 'success'
