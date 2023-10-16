class ImagesController < ApplicationController
  before_action :set_image, only: %i[ show update destroy ]

  # GET /images
  def index
    @images = Image.all

    render json: @images
  end

  # GET /images/1
  def show
    render json: @images
  end

  def getImage
    attachment = ActiveStorage::Blob.find_by(filename: params[:filename])

    if attachment
      # render json: { image_url: Rails.application.routes.url_helpers.rails_blob_path(attachment, only_path: true) }
      
      binary_data = attachment.download
      content_type = attachment.content_type
      send_data(binary_data, type: content_type, disposition: 'inline')
    else
      render json: { error: 'Image not found' }, status: :not_found
    end

  end

  def updateImageByName
    attachment = Image.joins(cover_attachment: :blob)
                    .where(ActiveStorage::Blob.arel_table[:filename].eq(params[:previousFile]))
                    .first
    if attachment
      @image = attachment
      if @image.update(image_params)
        render json: @image
      else
        render json: @image.errors, status: :unprocessable_entity
      end
    end
  end


  # POST /images
  def create
    @image = Image.new(image_params)

    if @image.save
      render json: @image, status: :created, location: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /images/1
  def update
    if @image.update(image_params)
      render json: @image
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  def destroy
    @image.destroy!
  end
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def image_params
      params.require(:image).permit(:cover)
    end
end
