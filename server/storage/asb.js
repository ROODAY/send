const {
  BlobServiceClient,
  StorageSharedKeyCredential
} = require('@azure/storage-blob');

class AzureBlobStorage {
  constructor(config, log) {
    this.log = log;

    const account = config.asb_account;
    const sharedKeyCredential = new StorageSharedKeyCredential(
      account,
      config.asb_accountKey
    );
    const blobServiceClient = new BlobServiceClient(
      `https://${account}.blob.core.windows.net`,
      sharedKeyCredential
    );
    this.containerClient = blobServiceClient.getContainerClient(
      config.asb_containerName
    );
  }

  async length(id) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    const result = await blobClient.getProperties();
    return Number(result.contentLength);
  }

  async getStream(id) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    const result = await blobClient.download(0);
    return result.readableStreamBody;
  }

  async set(id, file) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    return await blobClient.uploadStream(file);
  }

  del(id) {
    const blobClient = this.containerClient.getBlockBlobClient(id);
    return blobClient.delete({ deleteSnapshots: 'include' });
  }

  ping() {
    return this.containerClient.exists();
  }
}

module.exports = AzureBlobStorage;
