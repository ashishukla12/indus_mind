def create_metadata(filename, chunks):

    metadata = []

    for index, chunk in enumerate(chunks):

        metadata.append(
            {
                "source": filename,
                "chunk_number": index + 1,
                "length": len(chunk)
            }
        )

    return metadata